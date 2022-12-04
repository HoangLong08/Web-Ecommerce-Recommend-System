function formatCash(str) {
  // return str.split('').reverse().reduce((prev, next, index) => {
  // 	return ((index % 3) ? next : (next + '.')) + prev
  // })
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(str);
}

export { formatCash };
