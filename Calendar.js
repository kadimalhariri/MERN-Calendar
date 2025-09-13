import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { Box, Button, Typography, Paper, Grid, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = monthStart.getDay();
  const emptyStartDays = Array(startDay).fill(null);
  const allDays = [...emptyStartDays, ...daysInMonth];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: '0 auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={prevMonth}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5" component="h2">
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={nextMonth}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item xs key={day} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </Grid>
        ))}

        {allDays.map((day, index) => {
          const isSelected = day && isSameDay(day, selectedDate);
          const isCurrentMonth = day && isSameMonth(day, currentDate);
          
          return (
            <Grid item xs key={day ? day.toString() : `empty-${index}`}>
              <Button
                fullWidth
                variant={isSelected ? 'contained' : 'outlined'}
                color={isSelected ? 'primary' : 'inherit'}
                onClick={() => handleDateClick(day)}
                disabled={!day}
                sx={{
                  minWidth: '36px',
                  height: '36px',
                  p: 0,
                  color: isCurrentMonth ? 'text.primary' : 'text.disabled',
                }}
              >
                {day ? format(day, 'd') : ''}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="subtitle1">
          Selected Date: {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Calendar;
