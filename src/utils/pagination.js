import _ from "lodash";

function paginate(items, curentPageNumber, pageSize) {
  const startIndex = (curentPageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export default {
  paginate,
};
