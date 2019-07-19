export default function setBookList(books) {
    return {
        type: "add",
        books: books
    }
}