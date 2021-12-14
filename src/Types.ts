export type Picture = { caption: string, fileName: string };
export type Chapter = { title: string, pictures:Picture[] };
export type Model = { title: string, folder: string, coverImage: string, chapters: Chapter[] };