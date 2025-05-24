import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import styles from "@/styles/contribute.module.scss";
import modalStyles from "@/styles/skillsModal.module.scss";

const Contribute = ({ onClose }: any) => {
  const { data: session } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const [repoLink, setRepoLink] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      toast.info("Please sign in to contribute");
      return;
    }

    setIsDisabled(true);
    const response = await fetch("/api/contribute", {
      method: "POST",
      body: JSON.stringify({ repoLink }),
    });

    if (!response.ok) {
      toast.error("Failed to upload the repository!");
      setIsDisabled(false);
      return;
    }

    toast.success("Repository uploaded successfully!");

    const data = await response.json();
    console.log("Data:", data);
    setIsDisabled(false);
    setRepoLink("");
  };

  useEffect(() => {
    const regex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;
    if (regex.test(repoLink)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [repoLink]);

  useEffect(() => {
    const closeModal = (event: any) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeModal);
    return () => document.removeEventListener("keydown", closeModal);
  }, []);

  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h2>Add Repository</h2>
          <p>
            Submit an open-source repository that you think would be valuable
            for the community.
          </p>
          <div className={modalStyles.closeButton} onClick={onClose}>
            x
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.repoInput}>
            <p>GitHub Repository URL</p>
            <input
              autoFocus
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              placeholder="https://github.com/abc/xyz..."
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isDisabled}>
              Add Repository
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contribute;
