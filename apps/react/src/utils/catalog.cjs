const normalize=(text)=>String(text).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function filterProducts(products, search, category) { const term=normalize(search.trim()); return products.filter(product=>(!term||normalize(product.title).includes(term))&&(!category||product.category===category)); }
function formatPrice(value){return `R$ ${Number(value).toFixed(2).replace('.',',')}`;}
module.exports={filterProducts,formatPrice};
