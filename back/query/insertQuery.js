const insertLinkCardQuery = (req, currentCategory) => {
  return `insert into links (title, price, link, info, categories_id, users_id, registerTime) values (?, ?, ?, ?, (select id from categories where title = '${currentCategory}'
  and users_id = (select id from users where nickname = '${req.currentUserNickname}')),
  (select id from users where nickname = '${req.currentUserNickname}'), ?)`;
};
const insertCategoryQuery = (id, title) => {
  return `insert into categories (users_id, title) values ("${id}","${title}")
  `;
};

exports.insertLinkCardQuery = insertLinkCardQuery;
exports.insertCategoryQuery = insertCategoryQuery;
