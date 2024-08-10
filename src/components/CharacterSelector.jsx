import React, { useState } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const characters = [
  'Donald Trump',
  'Peter Griffin',
  'Kamala Harris',
  'Ryan Reynolds (Deadpool)',
  'Hugh Jackman (Wolverine)'
];

const CharacterSelector = ({ onSelectCharacters }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const handleCharacterSelect = (event) => {
    const { value } = event.target;
    if (selectedCharacters.includes(value)) {
      setSelectedCharacters(selectedCharacters.filter(c => c !== value));
    } else if (selectedCharacters.length < 2) {
      setSelectedCharacters([...selectedCharacters, value]);
    }
  };

  const handleSubmit = () => {
    onSelectCharacters(selectedCharacters);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
   <h1>Character Chat Application</h1>
      <FormControl fullWidth>
      <h3>Select up to 2 characters:</h3>
      
        <Select
          labelId="character-select-label"
          value={selectedCharacters}
          onChange={handleCharacterSelect}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {characters.map((character) => (
            <MenuItem
              key={character}
              value={character}
              disabled={selectedCharacters.length === 2 && !selectedCharacters.includes(character)}
            >
              {character}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={handleSubmit}
        disabled={selectedCharacters.length !== 2}
        variant="contained"
        sx={{ mt: 2 }}
      >
        Generate Prompt
      </Button>
    </Box>
  );
};

export default CharacterSelector;
