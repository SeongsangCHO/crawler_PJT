const deleteProductCardQuery = (deleteId) => {
  return `
    delete from links where id = ${deleteId};
  `;
};


exports.deleteProductCardQuery = deleteProductCardQuery;
