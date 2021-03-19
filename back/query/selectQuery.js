const selectCrawlTargetLinkCardIdQuery = (req, searchTitle) => {
  return `select id from links where users_id =
  (select id from users where nickname = '${req.currentUserNickname}'
  and title ='${searchTitle}'
  )`;
};

const selectCardCrawledDataQuery = (searchTitle) => {
  return `
  select  categories.title as category, links.title as linkTitle , links.price as linkPrice, links.info as linkInfo,
  links.link as link,links.registerTime as registerTime,
  crawl.title as crawlTitle,
  crawl.price as crawlPrice,
  crawl.source as crawlSource,
  crawl.link as crawlLink,
  crawl.imgsrc as crawlImgSrc
 from users
 LEFT join categories on users.id = categories.users_id
 LEFT  join links on categories.id = links.categories_id
 LEFT  join crawl on links.id = crawl.links_id
 where links.title = '${searchTitle}' ORDER BY registerTime DESC;`;
};

const selectLinkCardIdQuery = (req, title) => {
  const userId = req.currentUserNickname;
  return `select id from links where users_id =
  (select id from users where nickname = '${userId}'
  and title ='${title}'
  )`;
};

const selectUserDataQuery = (req) => {
  return `select  categories.title as category, links.title as linkTitle , links.price as linkPrice, links.info as linkInfo,
  links.link as link,links.registerTime as registerTime,
  crawl.title as crawlTitle,
  crawl.price as crawlPrice,
  crawl.source as crawlSource,
  crawl.link as crawlLink,
  crawl.imgsrc as crawlImgSrc
 from users
 LEFT join categories on users.id = categories.users_id
 LEFT  join links on categories.id = links.categories_id
 LEFT  join crawl on links.id = crawl.links_id
 where users.nickname = '${req.currentUserNickname}'
 ORDER BY registerTime DESC`;
};

exports.selectCrawlTargetLinkCardIdQuery = selectCrawlTargetLinkCardIdQuery;
exports.selectCardCrawledDataQuery = selectCardCrawledDataQuery;
exports.selectLinkCardIdQuery = selectLinkCardIdQuery;
exports.selectUserDataQuery = selectUserDataQuery;
