const { filterProducts, formatPrice } = require('../src/utils/catalog.cjs');
const products=[{id:1,title:'Câmera compacta',category:'electronics',price:99.9},{id:2,title:'Camisa casual',category:"men's clothing",price:40}];
test('filterProducts encontra pelo título e categoria',()=>{expect(filterProducts(products,'camera','')).toHaveLength(1);expect(filterProducts(products,'','electronics')).toHaveLength(1);});
test('formatPrice formata valor em reais',()=>{expect(formatPrice(129.5)).toBe('R$ 129,50');});
