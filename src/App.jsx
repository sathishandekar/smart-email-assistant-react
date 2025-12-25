import { Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react"

function App() {  
  const [emailContent, setEmailcontent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:9191/api/email/send",
        {
          emailContent,
          tone
        });
        setGeneratedReply(typeof response.data == 'string' ? response.data : JSON.stringify(response.data));
      
    } catch (error) {
      setError("Failed to generate email reply. Please try after some time..")
      
    } finally{
      setLoading(false);
    }

  };

  return (
    <>
      <Container maxWidth="md" sx={{py:2}}>
        <Typography variant="h4" sx={{mb: 3}}>
          Email Reply Generator
        </Typography>
        
        <TextField 
          fullWidth
          multiline
          rows={3}
          label="Original Email Content" 
          variant="outlined"
          value={emailContent || ''}
          onChange={(e) => setEmailcontent(e.target.value)}
          sx={{ mb: 2}}
           /> 
           <FormControl fullWidth sx={{ mb: 2}}>
            <InputLabel>Tone (Optional)</InputLabel>            
            <Select            
            value={tone || ''}
            label={"Tone (Optinal)"}
            onChange={(e) => setTone(e.target.value)}>
              <MenuItem value="">None</MenuItem>  
              <MenuItem value="professional">Professional</MenuItem> 
              <MenuItem value="casual">Casual</MenuItem> 
              <MenuItem value="friendly">Friendly</MenuItem>           
            </Select>
            </FormControl>  

            <Button
              sx={{mb: 4}}
              fullWidth
              variant='contained'
              onClick={handleSubmit}
              disabled={!emailContent ||loading}
             >
              {loading ? <CircularProgress size={24}/> : "Generate Reply"}
              </Button>  

              {error &&
              <Typography color='error' sx={{mb: 3}}>
                {error}
              </Typography>
              } 

          {generatedReply &&
          <TextField 
            fullWidth
            multiline
            rows={9}            
            label="Generated Email Reply" 
            variant="outlined"
            value={generatedReply || ''}
            onChange={(e) => setGeneratedReply(e.target.value)}
            inputProps={{ readOnly: true }}
            sx={{ mb: 2}}
           />           
           
          } 
          {generatedReply &&
          <Button
              variant='outlined'
              sx={{ mt: 2}}            
              onClick={() => navigator.clipboard.writeText(generatedReply)}              
             >
              Copy to clipboard
              </Button> 
          } 
                    
        
      </Container>  
    </>
  )
}

export default App
