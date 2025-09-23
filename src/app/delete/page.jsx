"use client";
import axios from "axios";
import { useState } from "react";

export default function Delete() {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [comment, setComment] = useState(null);
  const [commentId, setCommentId] = useState("");

  const buscarComentario = async () => {
    setloading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${commentId}`
);
      setComment(response.data);
    } catch (error) {
      setError(true);
      console.error("Error");
    } finally {
      setloading(false);
    }
  };

  const deletarComentario = async () => {
    setloading(true);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
      setSuccess(true);
      setComment(null);
      setCommentId("");
    } catch (error) {
      setError(true);
      console.error("Erro ao deletar comentário:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <h1>Deletar comentário</h1>

      <div>
        <input
          type="text"
          value={commentId}
          onChange={(e) => setCommentId(e.target.value)}
          placeholder="ID do comentário"
        />

        <button onClick={buscarComentario} disabled={loading || !commentId}>
          {loading ? "Buscando ..." : "Buscar"}
        </button>
      </div>

      {comment && (
        <div>
          <h2>Comentário Encontrado: {comment.id}</h2>
          <p>
            <strong>Nome:</strong> {comment.name}
          </p>
          <p>
            <strong>Email:</strong> {comment.email}
          </p>
          <p>
            <strong>Comentário:</strong> {comment.body}
          </p>
          <button onClick={deletarComentario} disabled={loading}>
            {loading ? "Deletando..." : "Deletar"}
          </button>
        </div>
      )}
      {error && <p>❌ Erro na operação</p>}
      {success && <p>✅ Comentário deletado com sucesso!</p>}
    </div>
  );
}
