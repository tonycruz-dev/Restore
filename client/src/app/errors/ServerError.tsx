import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
export default function ServerError() {
    const history = useNavigate();
    const location = useLocation();
    const stateError: any = location.state;
    return (
        <Container component={Paper}>
            {stateError ? (
                <>
                    <Typography variant='h3' color='error' gutterBottom>{'Internal server error'}</Typography>
                    <Divider />
                    <Typography>{stateError || 'Internal server error'}</Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>Server Error</Typography>
            )}
            <Button onClick={() => history('/catalog')}>Go back to the store</Button>
        </Container>
    )
}