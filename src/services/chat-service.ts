
import { ChatSpace, ChatMessage, Canvas, Journal } from "../models/chat";

// Local storage keys
const SPACES_KEY = 'chat-spaces';
const CANVASES_KEY = 'canvases';
const JOURNALS_KEY = 'journals';

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// Load data from localStorage
const loadSpaces = (): ChatSpace[] => {
  const spacesJson = localStorage.getItem(SPACES_KEY);
  if (!spacesJson) return [];
  
  try {
    const spaces = JSON.parse(spacesJson);
    // Convert string dates back to Date objects
    return spaces.map((space: any) => ({
      ...space,
      createdAt: new Date(space.createdAt),
      updatedAt: new Date(space.updatedAt),
      messages: space.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));
  } catch (e) {
    console.error('Error parsing spaces from localStorage', e);
    return [];
  }
};

const loadCanvases = (): Canvas[] => {
  const canvasesJson = localStorage.getItem(CANVASES_KEY);
  if (!canvasesJson) return [];
  
  try {
    const canvases = JSON.parse(canvasesJson);
    return canvases.map((canvas: any) => ({
      ...canvas,
      createdAt: new Date(canvas.createdAt),
      updatedAt: new Date(canvas.updatedAt)
    }));
  } catch (e) {
    console.error('Error parsing canvases from localStorage', e);
    return [];
  }
};

const loadJournals = (): Journal[] => {
  const journalsJson = localStorage.getItem(JOURNALS_KEY);
  if (!journalsJson) return [];
  
  try {
    const journals = JSON.parse(journalsJson);
    return journals.map((journal: any) => ({
      ...journal,
      createdAt: new Date(journal.createdAt),
      updatedAt: new Date(journal.updatedAt)
    }));
  } catch (e) {
    console.error('Error parsing journals from localStorage', e);
    return [];
  }
};

// Save data to localStorage
const saveSpaces = (spaces: ChatSpace[]) => {
  localStorage.setItem(SPACES_KEY, JSON.stringify(spaces));
};

const saveCanvases = (canvases: Canvas[]) => {
  localStorage.setItem(CANVASES_KEY, JSON.stringify(canvases));
};

const saveJournals = (journals: Journal[]) => {
  localStorage.setItem(JOURNALS_KEY, JSON.stringify(journals));
};

// Chat space operations
export const createSpace = (name: string = 'New Space'): ChatSpace => {
  const spaces = loadSpaces();
  const newSpace: ChatSpace = {
    id: generateId(),
    name,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  spaces.push(newSpace);
  saveSpaces(spaces);
  return newSpace;
};

export const getSpaces = (): ChatSpace[] => {
  return loadSpaces();
};

export const getSpace = (id: string): ChatSpace | undefined => {
  const spaces = loadSpaces();
  return spaces.find(space => space.id === id);
};

export const addMessageToSpace = (spaceId: string, content: string, isAi: boolean): ChatMessage | null => {
  const spaces = loadSpaces();
  const spaceIndex = spaces.findIndex(space => space.id === spaceId);
  
  if (spaceIndex === -1) return null;
  
  const message: ChatMessage = {
    id: generateId(),
    content,
    isAi,
    timestamp: new Date()
  };
  
  spaces[spaceIndex].messages.push(message);
  spaces[spaceIndex].updatedAt = new Date();
  
  saveSpaces(spaces);
  return message;
};

export const deleteSpace = (id: string): boolean => {
  const spaces = loadSpaces();
  const newSpaces = spaces.filter(space => space.id !== id);
  
  if (newSpaces.length === spaces.length) return false;
  
  saveSpaces(newSpaces);
  return true;
};

// Canvas operations
export const saveCanvas = (name: string, imageData: string, spaceId?: string): Canvas => {
  const canvases = loadCanvases();
  const newCanvas: Canvas = {
    id: generateId(),
    name,
    imageData,
    spaceId,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  canvases.push(newCanvas);
  saveCanvases(canvases);
  return newCanvas;
};

export const getCanvases = (spaceId?: string): Canvas[] => {
  const canvases = loadCanvases();
  if (spaceId) {
    return canvases.filter(canvas => canvas.spaceId === spaceId);
  }
  return canvases;
};

export const deleteCanvas = (id: string): boolean => {
  const canvases = loadCanvases();
  const newCanvases = canvases.filter(canvas => canvas.id !== id);
  
  if (newCanvases.length === canvases.length) return false;
  
  saveCanvases(newCanvases);
  return true;
};

// Journal operations
export const saveJournal = (title: string, content: string): Journal => {
  const journals = loadJournals();
  const existingJournalIndex = journals.findIndex(j => j.title === title);
  
  if (existingJournalIndex >= 0) {
    // Update existing journal
    journals[existingJournalIndex].content = content;
    journals[existingJournalIndex].updatedAt = new Date();
    saveJournals(journals);
    return journals[existingJournalIndex];
  } else {
    // Create new journal
    const newJournal: Journal = {
      id: generateId(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    journals.push(newJournal);
    saveJournals(journals);
    return newJournal;
  }
};

export const getJournals = (): Journal[] => {
  return loadJournals().sort((a, b) => 
    b.updatedAt.getTime() - a.updatedAt.getTime()
  );
};

export const getJournal = (id: string): Journal | undefined => {
  const journals = loadJournals();
  return journals.find(journal => journal.id === id);
};

export const deleteJournal = (id: string): boolean => {
  const journals = loadJournals();
  const newJournals = journals.filter(journal => journal.id !== id);
  
  if (newJournals.length === journals.length) return false;
  
  saveJournals(newJournals);
  return true;
};

// Simulate AI response (in a real app, this would call an API)
export const getAiResponse = async (message: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    "That's an interesting point. Let me think about it...",
    "I understand your question. Based on my knowledge, I believe...",
    "Thanks for sharing. Here's what I can tell you...",
    "That's a great question! The answer depends on several factors...",
    "I've analyzed your request and here's what I found...",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)] + 
    " (This is a simulated AI response to: " + message + ")";
};
