import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

// Dummy places data - replace with API call later
const dummyPlaces = [
  'Mumbai, Maharashtra',
  'Delhi, Delhi',
  'Bangalore, Karnataka',
  'Chennai, Tamil Nadu',
  'Kolkata, West Bengal',
  'Hyderabad, Telangana',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Surat, Gujarat',
  'Lucknow, Uttar Pradesh',
  'Kanpur, Uttar Pradesh',
  'Nagpur, Maharashtra',
  'Indore, Madhya Pradesh',
  'Thane, Maharashtra',
  'Bhopal, Madhya Pradesh',
  'Visakhapatnam, Andhra Pradesh',
  'Pimpri-Chinchwad, Maharashtra',
  'Patna, Bihar',
  'Vadodara, Gujarat'
];

const LocationSearch = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  onLocationSelect,
  sx = {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(value || '');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Filter places based on search term
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = dummyPlaces.filter(place =>
        place.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces([]);
    }
  }, [searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true);
    setSearchTerm('');
  };

  // Handle place selection
  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    setSearchTerm('');
    setIsOpen(false);
    if (onLocationSelect) {
      onLocationSelect(place);
    }
    if (onChange) {
      onChange(place);
    }
  };

  // Handle clear selection
  const handleClear = () => {
    setSelectedPlace('');
    setSearchTerm('');
    setIsOpen(false);
    if (onLocationSelect) {
      onLocationSelect('');
    }
    if (onChange) {
      onChange('');
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSelectedPlace(newValue);
    setSearchTerm(newValue);
    setIsOpen(true);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ position: 'relative', ...sx }} ref={dropdownRef}>
      <TextField
        ref={inputRef}
        fullWidth
        label={label}
        placeholder={placeholder}
        value={selectedPlace}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: selectedPlace && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          fontFamily: 'Montserrat',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: '#000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'Montserrat',
            fontWeight: 500,
          },
          '& .MuiInputBase-input': {
            fontFamily: 'Montserrat',
            fontWeight: 500,
          },
        }}
      />
      
      {isOpen && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: 200,
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e0e0e0',
            mt: 1,
            borderRadius: 2
          }}
        >
          <List dense>
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handlePlaceSelect(place)}
                  sx={{
                    fontFamily: 'Montserrat',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemText 
                    primary={place}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontFamily: 'Montserrat',
                      fontWeight: 500
                    }}
                  />
                </ListItem>
              ))
            ) : searchTerm.length >= 3 ? (
              <ListItem>
                <ListItemText 
                  primary="No results found"
                  primaryTypographyProps={{
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    fontFamily: 'Montserrat',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ) : searchTerm.length > 0 && searchTerm.length < 3 ? (
              <ListItem>
                <ListItemText 
                  primary="Type at least 3 characters to search"
                  primaryTypographyProps={{
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    fontFamily: 'Montserrat',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ) : null}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default LocationSearch; 