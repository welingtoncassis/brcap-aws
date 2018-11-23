const tiny = require("tiny-json-http");

// Get Index in Elastic Search
const getIndex = ({ index, host }) =>
  tiny.get({
    url: `${host}/${index}/_search`
  });

const getAllIndex = ({ host }) =>
  tiny.get({
    url: `${host}/_aliases`
  });

// Create Index in Elastic Search
const putIndex = ({ index, host, data }) =>
  tiny.put({
    url: `${host}/${index}`,
    data
  });

//Delete Index in Elastic Search
const deleteIndex = ({ index, host }) =>
  tiny.del({
    url: `${host}/${index}`
  });

//Mapping type of Index in Elastic Search
const putMappingType = ({ index, type, host, data }) =>
  tiny.put({
    url: `${host}/${index}/_mapping/${type}`,
    data
  });

// Search type of Index in Elastic Search
const searchTypeIndex = ({ index, type, host }) =>
  tiny.get({
    url: `${host}/${index}/${type}/_search`
  });

//Create data in type of Index in Elastic Search
const postData = ({ index, type, host, data }) =>
  tiny.post({
    url: `${host}/${index}/${type}`,
    data
  });

//Get data by ID in type of Index in Elastic Search
const getDataById = ({ index, type, host, id }) =>
  tiny.get({
    url: `${host}/${index}/${type}/${id}`
  });

module.exports = {
  getIndex,
  getAllIndex,
  putIndex,
  deleteIndex,
  putMappingType,
  searchTypeIndex,
  getDataById,
  postData
};