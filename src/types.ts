export type Gist = {
  id: string;
  name: string;
  date: string;
  time: string;
  Keyword: string;
  notebookname: string;
  files: {
    muneeb: string;
    faizan: string;
  };
};

export type UserGist = {
  name: string;
  date: string;
  imgUrl: string;
  authToken: string;
  time: string;
  Keyword: string;
  notebookname: string;
  files: {
    muneeb: string;
    faizan: string;
  };
};
