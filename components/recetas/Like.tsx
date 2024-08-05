import React, { useEffect, useState } from 'react';

interface LikeButtonProps {
  postId: string; // Identifiant unique pour chaque post
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const localStorageKey = `liked_${postId}`;

  const [liked, setLiked] = useState(() => {
    // Utilisez localStorage pour récupérer la valeur initiale du like
    const storedValue = localStorage.getItem(localStorageKey);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    // Mettez à jour localStorage lorsque l'état du like change
    localStorage.setItem(localStorageKey, JSON.stringify(liked));
  }, [liked, localStorageKey]);

  const handleLikeClick = () => {
    setLiked(!liked);
    // Vous pouvez également envoyer une requête au serveur pour enregistrer le "like" côté backend
  };

  return (
    <div className="flex items-center justify-center space-x-1 pt-6 text-xl text-gray-500">
      <button type="button" onClick={handleLikeClick}>
        {liked ? <span>❤️</span> : <span>🤍</span>}
      </button>
    </div>
  );
};

export default LikeButton;
