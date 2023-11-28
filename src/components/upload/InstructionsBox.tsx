import { Box, Typography } from '@mui/material';

const InstructionsBox: React.FC = () => {
    return (
        <Box sx={{ p: 3, border: '1px solid grey', borderRadius: 2, marginBottom: '20px' }}>
            <Typography variant="h3" padding={2} textAlign={"center"}>Instructions to copy paste</Typography>
            <Typography variant="h4">Windows</Typography>
            <Typography variant="body1">
                Use the 'clip' command to copy the content of a file to the clipboard. Example: 'type config.toml | clip'
            </Typography>
            <Typography variant="h4" paddingTop={2}>macOS</Typography>
            <Typography variant="body1">
                Use the 'pbcopy' command to copy the content of a file to the clipboard. Example: 'cat config.toml | pbcopy'
            </Typography>
            <Typography variant="h4" paddingTop={2}>Linux (with xclip installed)</Typography>
            <Typography variant="body1">
                Install xclip with 'sudo apt-get install xclip'. (If using SSH, please ssh -X to enable X11 forwarding)
            </Typography>
            <Typography variant="body1">
                Use the 'xclip' command to copy the content of a file to the clipboard. Example: 'xclip -selection clipboard {'<'} config.toml'
            </Typography>
        </Box>
    );
};

export default InstructionsBox;