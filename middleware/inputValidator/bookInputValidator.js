const bookRequestBodyToObject = (body) => {
  return {
    publisher: body.publisher,
    title: body.title,
    author: body.author,
    content: body.content,
    pages: body.pages,
    publicationDate: body.publicationDate,
    releaseDate: body.releaseDate,
    image: body.image,
    price: body.price,
    inventoryCount: body.inventoryCount,
    category: body.category,
    seller: body.auth._id,
  };
};

const bookInputValidator = (req, res, next) => {
  try {
    const bookData = bookRequestBodyToObject(req.body);

    if (!bookData.publisher) {
      throw new Error("출판사를 입력해주세요.");
    }

    if (!bookData.title) {
      throw new Error("도서제목을 입력해주세요.");
    }

    if (!bookData.author) {
      throw new Error("저자를 입력해주세요.");
    }

    if (!bookData.content) {
      throw new Error("내용를 입력해주세요.");
    }

    if (!bookData.pages) {
      throw new Error("전체 쪽수를 입력해주세요.");
    }

    if (!bookData.publicationDate) {
      throw new Error("발행일자를 입력해주세요.");
    }

    if (!bookData.releaseDate) {
      throw new Error("출시일자를 입력해주세요.");
    }

    if (!bookData.image) {
      throw new Error("이미지를 선택해주세요.");
    }

    if (!bookData.price) {
      throw new Error("가격을 입력해주세요.");
    }

    if (!bookData.inventoryCount) {
      throw new Error("재고를 입력해주세요.");
    }

    if (!bookData.category) {
      throw new Error("카테고리를 선택해주세요.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { bookRequestBodyToObject, bookInputValidator };
