import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Side from "@/components/side/Side";
import Comments from "@/components/comments/Comments";

const singlePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1>Lorem ipsum dolor, amet et ducimus aspernatur quis.</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src="/logo.png"
                alt="user"
                width={42}
                height={42}
                priority
                className={styles.userImage}
              />
            </div>
            <div className={styles.userName}>Sujeong Ji</div>
          </div>
          <div className={styles.date}>
            <div className={styles.publishedDate}>Updated: 2023.11.11</div>
            <div className={styles.divisor}>|</div>
            <div className={styles.updatedDate}>Published: 2023.11.11</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.articleImageContainer}>
            <Image
              src="/blog.png"
              alt="article"
              width={400}
              height={500}
              priority
              className={styles.articelImage}
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.desc}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolorum eum quae expedita dignissimos veniam corrupti, magni
              nobis, deleniti velit sunt deserunt aspernatur repellendus qui
              officiis molestias dolorem, ipsam commodi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolorum eum quae expedita dignissimos veniam corrupti, magni
              nobis, deleniti velit sunt deserunt aspernatur repellendus qui
              officiis molestias dolorem, ipsam commodi. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Tempora autem quibusdam vero
              hic doloremque dolores, blanditiis ea a illum quisquam quo quos
              accusantium eos? Autem doloremque officiis vero tenetur. Sit!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolorum eum quae expedita dignissimos veniam corrupti, magni
              nobis, deleniti velit sunt deserunt aspernatur repellendus qui
              officiis molestias dolorem, ipsam commodi. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Tempora autem quibusdam vero
              hic doloremque dolores, blanditiis ea a illum quisquam quo quos
              accusantium eos? Autem doloremque officiis vero tenetur. Sit!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolorum eum quae expedita dignissimos veniam corrupti, magni
              nobis, deleniti velit sunt deserunt aspernatur repellendus qui
              officiis molestias dolorem, ipsam commodi. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Tempora autem quibusdam vero
              hic doloremque dolores, blanditiis ea a illum quisquam quo quos
              accusantium eos? Autem doloremque officiis vero tenetur. Sit!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolorum eum quae expedita dignissimos veniam corrupti, magni
              nobis, deleniti velit sunt deserunt aspernatur repellendus qui
              officiis molestias dolorem, ipsam commodi. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Tempora autem quibusdam vero
              hic doloremque dolores, blanditiis ea a illum quisquam quo quos
              accusantium eos? Autem doloremque officiis vero tenetur. Sit!
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolorum eum quae expedita dignissimos veniam corrupti, magni
              nobis, deleniti velit sunt deserunt aspernatur repellendus qui
              officiis molestias dolorem, ipsam commodi. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Tempora autem quibusdam vero
              hic doloremque dolores, blanditiis ea a illum quisquam quo quos
              accusantium eos? Autem doloremque officiis vero tenetur. Sit!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              dolorum eum quae expedita dignissimos veniam corrupti, magni
              nobis, deleniti velit sunt deserunt aspernatur repellendus qui
              officiis molestias dolorem, ipsam commodi. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Tempora autem quibusdam vero
              hic doloremque dolores, blanditiis ea a illum quisquam quo quos
              accusantium eos? Autem doloremque officiis vero tenetur. Sit!
            </p>
          </div>
          <div className={styles.comments}>
            <Comments />
          </div>
        </div>
        <div className={styles.side}>
          <Side />
        </div>
      </div>
    </div>
  );
};

export default singlePage;
