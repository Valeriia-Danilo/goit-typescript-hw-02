import React from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className="button-container">
      <button onClick={onClick} className={css.button}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;