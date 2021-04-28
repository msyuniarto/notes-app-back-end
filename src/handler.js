const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    //mendapatkan body request
    const { title, tags, body } = request.payload;

    //generate id 16 char dari module nanoid()
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //create newNote
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    //memasukkan nilai2 ke dalam array notes
    notes.push(newNote);

    //cek newNotes sudah masuk ke array notes
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    //dapetin id
    const { id } = request.params;

    //search by id menggunakan filter()
    const note = notes.filter((n) => n.id === id)[0];

    //validasi
    if(note !== undefined){
        return {
            status: 'success',
            data: {
                note,
            }
        };
    }

    //handle jika tidak ditemukan
    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    //dapetin id
    const { id } = request.params;

    //tampung value
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    //cari data berdasarkan id
    const index = notes.findIndex((note) => note.id === id);

    //validasi
    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    //dapetin id
    const { id } = request.params;

    //cari data berdasarkan id
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        //hapus data pada array berdasarkan index
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};