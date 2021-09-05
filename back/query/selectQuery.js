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
  return `select  links.id as linkId, categories.title as category, links.title as linkTitle , links.price as linkPrice, links.info as linkInfo,
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

const selectCategories = (id) => {
  return `select title, id from categories where users_id = ${id}
  `;
};

const selectLinkCardList = (id) => {
  return `
  select id,title,price,link,info,registerTime from links where categories_id = ${id};`;
};

const selectProducts = (id) => {
  return `
  select 
  crawl.id as crawlId,
  crawl.title as crawlTitle,
  crawl.price as crawlPrice,
  crawl.source as crawlSource,
  crawl.link as crawlLink,
  crawl.imgsrc as crawlImgSrc,
  links.id as linksId,
  links.categories_id as categoriesId
  from crawl LEFT join links on crawl.links_id = links.id where links.users_id = ${id};`;
};

const selectCards = (id) => {
  return `
  select
    title,
    id,
    info,
    price,
    link,
    registerTime
   from links where users_id = ${id}`;
};
exports.selectCrawlTargetLinkCardIdQuery = selectCrawlTargetLinkCardIdQuery;
exports.selectCardCrawledDataQuery = selectCardCrawledDataQuery;
exports.selectLinkCardIdQuery = selectLinkCardIdQuery;
exports.selectUserDataQuery = selectUserDataQuery;
exports.selectCategories = selectCategories;
exports.selectLinkCardList = selectLinkCardList;
exports.selectProducts = selectProducts;
exports.selectCards = selectCards;
