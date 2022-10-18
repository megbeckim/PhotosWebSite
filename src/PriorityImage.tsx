import React, { Component, createRef, ImgHTMLAttributes, useState, RefObject } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { priority: number, imageRef?: RefObject<HTMLImageElement> };

const images: {[k in string]: HTMLImageElement} = {};

const queuedImages: {src: string, priority: number, callback: ()=>void }[] = [];
const loadingImages: string[] = [];
const loadedImages: string[] = [];

const SIMULTANEOUS_DOWNLOADS = 5;

function addToQueue(entry: typeof queuedImages[number]) {
    const { src, priority, callback } = entry;

    const queuedImage = queuedImages.find( ({ src: candidateSrc }) => candidateSrc === src );

    const queued = queuedImage !== undefined;
    const loading = loadingImages.find(o => o == src);
    const loaded = loadedImages.find(o => o == src);

    // update queuedImage if necessary
    if (queuedImage !== undefined && queuedImage.priority !== priority) {
        queuedImage.priority = priority;
        queuedImages.sort((a, b) => a.priority - b.priority);
    }

    // if loaded, loading, or queued, then call the callback and do nothing else
    if (loaded || loading || queued) {
        callback();
        return;
    }

    // enqueue this entry
    queuedImages.push(entry);
    queuedImages.sort((a, b) => a.priority - b.priority);

    startLoadingIfLimitNotReached();
}

function startLoadingIfLimitNotReached() {
    if (loadingImages.length >= SIMULTANEOUS_DOWNLOADS || queuedImages.length === 0) {
        return;
    }

    const { src, callback } = queuedImages.shift();

    const image = new Image();
    image.onload = () => {
        const index = loadingImages.indexOf(src);
        loadingImages.splice(index, 1);
        loadedImages.push(src);

        callback();

        if (loadingImages.length <= 5 && queuedImages.length > 0) {
            startLoadingIfLimitNotReached();
        }
    }
    image.src = src;

    loadingImages.push(src);
}

export const PriorityImage = (props: Props) => {
        const [ loaded, setLoaded ] = useState(false);

        const { priority, imageRef, ...imgProps } = props;
        const { src, ...nonSrcProps } = imgProps;

        if (!loaded && src !== null && images[src] === undefined) {
            const callback = () => {
                    setLoaded(true);
                }
            addToQueue({ src, priority, callback });
        }
        const propsToUse = { ...(loaded ? imgProps : nonSrcProps) };
        return (
            <img ref={imageRef} { ...propsToUse } />
          );
    };