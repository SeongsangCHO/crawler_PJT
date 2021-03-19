const insertLinkCardQuery = (req, currentCategory) => {
  return `insert into links (title, price, link, info, categories_id, users_id, registerTime) values (?, ?, ?, ?, (select id from categories where title = '${currentCategory}'
  and users_id = (select id from users where nickname = '${req.currentUserNickname}')),
  (select id from users where nickname = '${req.currentUserNickname}'), ?)`;
};
const insertCategoryQuery = () => {
  return `insert into categories (users_id, title) values 
  ((SELECT id from users WHERE nickname = ?), ?);
  `;
};

exports.insertLinkCardQuery = insertLinkCardQuery;
exports.insertCategoryQuery = insertCategoryQuery;
