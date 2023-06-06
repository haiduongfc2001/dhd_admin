function formatPrice(price) {
    return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    });

    // Sử dụng hàm formatPrice để định dạng giá sản phẩm
    // const formattedPrice = formatPrice(price);

}

export default formatPrice;