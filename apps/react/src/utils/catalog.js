const normalize = (text) => String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export function filterProducts(products, search, category){
  const term = normalize(search.trim());
  return products.filter(product => (!term || normalize(product.title).includes(term)) && (!category || product.category === category));
}
export function formatPrice(value){ return `R$ ${Number(value).toFixed(2).replace('.', ',')}`; }
