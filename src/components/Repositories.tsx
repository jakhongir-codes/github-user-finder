import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ForkRightIcon from '@mui/icons-material/ForkRight';

export default function RepositoriesGrid() {
  const repositories = useSelector(
    (state: RootState) => state.repositories.repositories
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        p: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {repositories.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No repositories found.
        </Typography>
      ) : (
        repositories.map((repo: any) => (
          <Card
            key={repo.id}
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                {repo.name}
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {repo.description || 'No description available.'}
              </Typography>

              {/* Stats Row */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarIcon sx={{ fontSize: 18, color: 'gold' }} />
                  <Typography variant="body2">
                    {repo.stargazers_count}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <VisibilityIcon sx={{ fontSize: 18, color: 'gray' }} />
                  <Typography variant="body2">
                    {repo.watchers_count}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ForkRightIcon sx={{ fontSize: 18, color: 'gray' }} />
                  <Typography variant="body2">{repo.forks_count}</Typography>
                </Box>
              </Box>
            </CardContent>

            {/* 👇 Stick to bottom */}
            <CardActions sx={{ mt: 'auto' }}>
              <Button
                size="small"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
}
