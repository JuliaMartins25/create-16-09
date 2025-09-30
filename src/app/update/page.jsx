'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Edit() {
    const [commentID, setCommentID] = useState("");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('');
            setForm({name: data.name, email: data.email, body: data.body});
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const editarComentario = async () => {
        setLoading(true);
        try{
            await axios.put(`https://jsonplaceholder.typicode.com/comments`, form);
            setSuccess(true);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div> 
            <h1>Editar Comentário</h1>

            <div>
                <input
                type= "number"
                value={{commentID}}
                onChange={(e) => setCommentID(e.target.value)}
                placeholder= "ID do comentário"
                />
                <button onClick={buscarComentario} disabled={loading}>
                    {loading ? "Buscando ..." : "Buscar Comentário"}
                </button>
            </div>

            {form.name && (
                <div>
                    <h2>Editando Comentário #{commentId}</h2>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Nome"
                    />
                    <br />
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email"
                    />
                    <br />
                    <textarea
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        placeholder="Comentário"
                        rows="3"
                    />
                    <br />
                    <button onClick={editarComentario} disabled={loading || !form.name?.trim()}>
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            )}


            {error && <p>Error na operação</p>}
            {success && <p>Comentário editando com sucesso!</p>}
        </div>
    )
}