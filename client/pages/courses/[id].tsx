/* eslint-disable @next/next/no-img-element */

import styles from "../../styles/coursePage.module.scss";
import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import { useRouter } from "next/router";
import courseService, { CourseType } from "@/src/services/courseService";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import EpisodeList from "@/src/components/episodesList";
import Footer from "@/src/components/common/footer";
import PageSpinner from "@/src/components/common/spinner";

const CoursePage = function () {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem("onebitflix-token")) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, []);

    const { id } = router.query;

    const [course, setCourse] = useState<CourseType>();

    const [liked, setLiked] = useState(false);
    const [favorited, setFavorited] = useState(false);

    const getCourse = async function () {
        if (typeof id !== "string") return;

        const res = await courseService.getEpisodes(id);

        if (res.status === 200) {
            setCourse(res.data);
            setLiked(res.data.liked);
            setFavorited(res.data.favorited);
        }
    };

    const handleWatchNow = async () => {
        router.push(`/courses/episode/0?courseid=${course?.id}&episodeid=${course?.episodes![0].id}`);
    }

    const handleLikeCourse = async () => {
        if (liked === true) {
            await courseService.removeLike(String(id));
            setLiked(false);
        } else {
            await courseService.like(String(id));
            setLiked(true);
        }
    };
    const handleFavCourse = async () => {
        if (favorited === true) {
            await courseService.removeFav(String(id));
            setFavorited(false);
        } else {
            await courseService.addToFav(String(id));
            setFavorited(true);
        }
    };

    useEffect(() => {
        getCourse();
    }, [id]);

    if (loading) {
        return <PageSpinner />;
    }

    return (
        <>
            <Head>
                <title>Onebitflix - {course?.name}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <section className={styles.mainContent}>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "450px",
                        }}
                    >
                        <HeaderAuth />
                    </div>
                    <Container className={styles.courseInfo}>
                        <p className={styles.courseTitle}>{course?.name}</p>
                        <p className={styles.courseDescription}>{course?.synopsis}</p>
                        <Button outline className={styles.courseBtn} disabled={course?.episodes?.length === 0 ? true : false} onClick={handleWatchNow} >
                            ASSISTIR AGORA!
                            <img
                                src="/buttonPlay.svg"
                                alt="buttonImg"
                                className={styles.buttonImg}
                            />
                        </Button>
                        <div className={styles.interactions}>
                            {liked === false ? (
                                <img
                                    src="/course/iconLike.svg"
                                    alt="likeImage"
                                    className={styles.interactionImages}
                                    onClick={handleLikeCourse}
                                />
                            ) : (
                                <img
                                    src="/course/iconLiked.svg"
                                    alt="likedImage"
                                    className={styles.interactionImages}
                                    onClick={handleLikeCourse}
                                />
                            )}
                            {favorited === false ? (
                                <img
                                    onClick={handleFavCourse}
                                    src="/course/iconAddFav.svg"
                                    alt="addFav"
                                    className={styles.interactionImages}
                                />
                            ) : (
                                <img
                                    onClick={handleFavCourse}
                                    src="/course/iconFavorited.svg"
                                    alt="favorited"
                                    className={styles.interactionImages}
                                />
                            )}
                        </div>
                    </Container>
                    <Container className={styles.episodeInfo}>
                        <p className={styles.episodeDivision}>EPISÓDIOS</p>
                        <p className={styles.episodeLength}>
                            {course?.episodes && course?.episodes.length} episódios
                        </p>
                        {course?.episodes?.length === 0 ? (
                            <p>
                                <strong>Não temos episódios ainda, volte outra hora! &#x1F606;&#x1F918;</strong>
                            </p>
                        ) : (
                            course?.episodes?.map((episode) => (
                                <EpisodeList key={episode.id} episode={episode} course={course} />
                            ))
                        )}
                    </Container>
                </section>
                <Footer />
            </main>
        </>
    );
};

export default CoursePage;