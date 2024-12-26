import {Button, CircularProgress, Container, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import React, {useEffect, useState} from "react";
import {getLink, postLink} from "../../slices/sliceLink/sliceLink.tsx";

const Link = () => {
    const dispatch = useAppDispatch();
    const { links, isLoading } = useAppSelector((state) => state.app);
    const [url, setUrl] = useState("");
    const [shortLink, setShortLink] = useState("");

    useEffect(() => {
        dispatch(getLink());
    }, [dispatch]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim() === "") return;
        dispatch(postLink(url));
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };


    useEffect(() => {
        if (links.length > 0) {
            setShortLink(links[links.length - 1].shortUrl);
        }
    }, [links]);


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Grid container justifyContent="center" direction="column" alignItems="center">
                    <Typography
                        variant="h3"
                        sx={{
                            color: 'black',
                            mb: 3,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        Shorten your link!
                    </Typography>
                    {isLoading && (
                        <Grid container justifyContent="center" sx={{ my: 5 }}>
                            <CircularProgress />
                        </Grid>
                    )}

                    {!isLoading && (
                        <form onSubmit={onSubmit}>
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    mx: "auto",
                                    width: "80%",
                                    border: "3px solid #001f3d",
                                    borderRadius: "10px",
                                    p: 3,
                                    mt: 3
                                }}
                            >
                                <Grid size={12}>
                                    <TextField
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "white",
                                            borderRadius: "10px",
                                        }}
                                        id="link"
                                        label="Enter your URL"
                                        variant="outlined"
                                        name="link"
                                        type="url"
                                        required
                                        value={url}
                                        onChange={handleUrlChange}
                                        disabled={isLoading}
                                    />
                                </Grid>
                                <Grid size={12} textAlign="center">
                                    <Button
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        disabled={isLoading || !url.trim()}
                                    >
                                        {isLoading ? "Shortening..." : "Shorten"}
                                    </Button>
                                </Grid>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'black',
                                        mt: 3,
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Your link now looks like this:
                                </Typography>
                                <Grid size={12}>
                                    <TextField
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "white",
                                            borderRadius: "10px",
                                        }}
                                        id="shortLink"
                                        label="Shortened Link"
                                        variant="outlined"
                                        name="shortLink"
                                        value={shortLink}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default Link;