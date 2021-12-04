import _ from "lodash";

function getPages(pageSize, itemsCount) {
  const pageCount = Math.ceil(itemsCount / pageSize) + 1;
  if (pageCount === 2) return [];
  return _.range(1, pageCount);
}

function paginate(items, curentPageNumber, pageSize) {
  const startIndex = (curentPageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export default {
  getPages,
  paginate,
};
