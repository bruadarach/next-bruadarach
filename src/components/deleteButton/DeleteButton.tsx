import styles from "./deleteButton.module.css";

const DeleteButton = ({ slug }: { slug: string }) => {
  const handleDelete = async (slug: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await fetch(`https://next-bruadarach.vercel.app/api/posts/${slug}`, {
        method: "DELETE",
      });
      window.location.replace("/");
    }
  };

  return (
    <button
      className={styles.button}
      onClick={() => {
        handleDelete(slug);
      }}
    >
      delete
    </button>
  );
};

export default DeleteButton;
