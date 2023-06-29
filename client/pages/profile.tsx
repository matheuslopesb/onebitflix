import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import PageSpinner from "@/src/components/common/spinner";
import PasswordForm from "@/src/components/profile/password";
import UserForm from "@/src/components/profile/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import styles from "../styles/profile.module.scss";

const Profile = function () {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem("onebitflix-token")) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, []);

    const [form, setForm] = useState("userForm");

    if (loading) {
        return <PageSpinner />;
    }

    return (
        <>
            <Head>
                <title>Onebitflix - Meus Dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container calssName="py-5">
                    <p className={styles.title}>Minha Conta</p>
                    <Row className="pt-3 pb-5">
                        <Col md={4} className={styles.btnColumn}>
                            <Button
                                outline
                                className={styles.renderFormBtn}
                                onClick={() => {
                                    setForm("userForm");
                                }}
                            >
                                DADOS PESSOAIS
                            </Button>
                            <Button
                                outline
                                className={styles.renderFormBtn}
                                onClick={() => {
                                    setForm("passwordForm");
                                }}
                            >
                                SENHA
                            </Button>
                        </Col>
                        <Col md>
                            {form === "userForm" ? <UserForm /> : <PasswordForm />}
                        </Col>
                    </Row>
                </Container>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </main>
        </>
    );
};

export default Profile;