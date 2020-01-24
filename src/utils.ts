import dateFormat from "dateformat";
import { differenceInHours, differenceInDays } from "date-fns";
import { uniqBy } from "lodash";

export const getFormattedData = data => {
  let timeElapsed = "";
  const formattedData = data.map(item => {
    const {
      id,
      created_at,
      owner: { login, avatar_url },
      files,
      description
    } = item;
    const firstFileName = Object.keys(files)[0];
    const hoursDiffernce = differenceInHours(new Date(), new Date(created_at));
    const formattedTime = dateFormat(created_at, "hh:MM:ss TT");
    const formattedDate = dateFormat(created_at, "d mmm yyyy");
    if (hoursDiffernce < 24) {
      timeElapsed = `Created ${hoursDiffernce} hours ago`;
    } else {
      timeElapsed = `Created ${differenceInDays(
        new Date(),
        new Date(created_at)
      )} days ago`;
    }
    return {
      time: formattedTime,
      id,
      name: login,
      date: formattedDate,
      avatar_url: avatar_url,
      files: files,
      timeElapsed: timeElapsed,
      description: description,
      firstFileName: firstFileName
    };
  });
  return formattedData;
};

export const getContent = data => {
  console.log(data);
  const content = uniqBy(data, "url").map(item => {
    const { files } = item;
    const firstFileName = Object.keys(files)[0];
    const data = Object.values(files)["0"].content;
    return {
      content: data
    };
  });
  return content;
};

export const fetchAction = (action: any) => {
  const fetchActionTemplate = {
    type: "",
    endpoint: null,
    verb: "",
    payload: null,
    headers: {}
  };
  return {
    FETCH_ACTION: {
      ...fetchActionTemplate,
      ...action
    }
  };
};
