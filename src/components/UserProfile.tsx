import * as React from 'react';
import {
  Avatar,
  Box,
  Card,
  Typography,
  Link,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';

interface IUserProfile {
    avatar_url: string;
    name: string;
    login: string;
    html_url: string;
    bio?: string | null;
    company?: string | null;
    location?: string | null;
    blog?: string | null;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
    created_at: string;
}

export default function UserProfileCard() {
  const user: IUserProfile = useSelector((state: RootState)=> state.user.user!)
  if(!user?.name) {
    return  <Typography variant="body1" color="text.secondary">
          No user found.
        </Typography>
  }
  return (
    
    <Card
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      {/* Avatar */}
      <Avatar
        alt={user.name || user.login}
        src={user.avatar_url}
        sx={{ width: 120, height: 120, mb: 2 }}
      />

      {/* Name + Username */}
      <Typography variant="h5" fontWeight="bold">
        {user.name || user.login}
      </Typography>
      <Link
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        color="text.secondary"
      >
        @{user.login}
      </Link>

      {/* Bio */}
      {user.bio && (
        <Typography variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
          {user.bio}
        </Typography>
      )}

      {/* Info Chips */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        {user.company && <Chip label={user.company} variant="outlined" />}
        {user.location && <Chip label={user.location} variant="outlined" />}
        {user.blog && (
          <Chip
            label="Blog"
            component="a"
            href={user.blog}
            target="_blank"
            clickable
            variant="outlined"
          />
        )}
      </Stack>

      <Divider sx={{ my: 2, width: '100%' }} />

      {/* Stats */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h6">{user.followers}</Typography>
          <Typography variant="body2" color="text.secondary">
            Followers
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">{user.following}</Typography>
          <Typography variant="body2" color="text.secondary">
            Following
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">{user.public_repos}</Typography>
          <Typography variant="body2" color="text.secondary">
            Repositories
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, width: '100%' }} />

      {/* Account creation */}
      <Typography variant="body2" color="text.secondary">
        Joined on {new Date(user.created_at).toLocaleDateString()}
      </Typography>
    </Card>
  );
}
