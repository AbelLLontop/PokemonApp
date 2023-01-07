import { Card, Divider } from "@mui/material";
import { getTypes, pokemonService } from "./services/pokemonService";
import { useAsync } from "react-async-hook";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CardActionArea } from '@mui/material';
import {useState}from 'react';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props:TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (value === index)?<>{children}</>:<></>
}


const AllPokemons= ()=>{
  const { result, loading } = useAsync(pokemonService, []);

  if (loading) return <pre>Loading...</pre>;

  return ( <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      justifyContent: "center",
      padding:'1rem'
    }}
  >
    {result?.data.map((pokemon) => (
      <Card
        key={pokemon.id}
        sx={{ maxWidth: 260, height: "fit-content" }}
        elevation={8}
      >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar title={pokemon.name} src={pokemon.image}></Avatar>
          }
          title={
            <Typography
              sx={{ fontWeight: "bold" }}
            >{`#${pokemon.id}`}</Typography>
          }
        />

        <CardMedia
          sx={{
            height: "4rem",
            width: "4rem",
            backgroundSize: "contain",
            margin: "0 auto",
          }}
          image={pokemon.sprite}
          title={pokemon.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.name}
          </Typography>
          <Box sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "4px",
    }}>
          {pokemon.types.map((tipo:any)=>(<Chip label={tipo.type.name} />))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {pokemon.description}
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Button>Detalles</Button>
        </CardActions>
      </Card>
    ))}
  </Box>   )
}

const TypesPokemon=()=>{
  const {result,loading} = useAsync(getTypes,[]);
  
  if (loading) return <pre>Loading...</pre>;

  return <div>
    <div style={{display:'flex',justifyContent:'center',gap:'8px',flexWrap:'wrap',margin:'1rem 0'}}>
      {result.results.map((result:any)=>(<Chip label={result.name}/>))}
    </div>
    <pre>

      {JSON.stringify(result,null,2)}
    </pre>
  </div>
}

const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 
  return (
    <div>

      <Divider sx={{marginY:'1rem'}}>
        <Typography variant="h4">Pokemons</Typography>
      </Divider>
      <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All pokemons"  />
          <Tab label="Types"  />
          <Tab label="Categories"  />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AllPokemons/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <TypesPokemon/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       3
      </TabPanel>
     
    </div>
  );
};

export default App;
