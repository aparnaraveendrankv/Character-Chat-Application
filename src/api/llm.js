import axios from 'axios';

export const generatePrompt = async (character1, character2) => {
  const prompt = `Generate a short rap roasting battle between two characters. Each character should have a couple of lines, and each line should be concise. Use the following placeholders for the characters' names: Don't give anything other than the dialogues. Don't explain your answer:\nCharacter 1: ${character1}\nCharacter 2: ${character2}`;
  
  try {
    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyADPG0aooJLFqu9N7MwIrdKAh_W7Id3L-Y', {
      contents: [{ parts: [{ text: prompt }] }]
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating prompt', error);
    throw error;
  }
};
