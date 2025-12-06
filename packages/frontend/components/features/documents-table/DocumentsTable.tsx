'use client';

import {useState} from 'react';
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import {DocumentListItem, SortField, SortOrder} from '@/types';
import {DocumentsTableProps} from "./DocumentsTable.props";
import {indigo} from "@mui/material/colors";
import { formatFileSize, formatDate } from "@/lib";

export default function DocumentsTable({
  items,
  selected,
  onSelectAll,
  onSelectOne,
  onSort,
  sortField,
  sortOrder,
  onItemClick,
  onRename,
  onMove,
  onDelete,
}: DocumentsTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuItem, setMenuItem] = useState<DocumentListItem | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: DocumentListItem) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuItem(null);
  };

  const handleMenuAction = (action: 'rename' | 'move' | 'delete') => {
    if (menuItem) {
      switch (action) {
        case 'rename':
          onRename(menuItem);
          break;
        case 'move':
          onMove(menuItem);
          break;
        case 'delete':
          onDelete(menuItem);
          break;
      }
    }
    handleMenuClose();
  };

  const isAllSelected = items.length > 0 && selected.length === items.length;
  const isSomeSelected = selected.length > 0 && selected.length < items.length;

  return (
    <>
      <TableContainer component={Paper} className="rounded-xl shadow-sm">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#051d45' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isSomeSelected}
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
                />
              </TableCell>

              <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                <TableSortLabel
                  active={sortField === SortField.Name}
                  direction={sortField === SortField.Name ? sortOrder : SortOrder.Asc}
                  onClick={() => onSort(SortField.Name)}
                  sx={{
                    color: 'white !important',
                    '&.Mui-active': { color: 'white !important' },
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                  }}
                >
                  Name
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                <TableSortLabel
                  active={sortField === SortField.CreatedBy}
                  direction={sortField === SortField.CreatedBy ? sortOrder : 'asc'}
                  onClick={() => onSort(SortField.CreatedBy)}
                  sx={{
                    color: 'white !important',
                    '&.Mui-active': { color: 'white !important' },
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                  }}
                >
                  Created by
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                <TableSortLabel
                  active={sortField === SortField.CreatedAt}
                  direction={sortField === SortField.CreatedAt ? sortOrder : 'asc'}
                  onClick={() => onSort(SortField.CreatedAt)}
                  sx={{
                    color: 'white !important',
                    '&.Mui-active': { color: 'white !important' },
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                  }}
                >
                  Date
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                <TableSortLabel
                  active={sortField === SortField.FileSizeBytes}
                  direction={sortField === SortField.FileSizeBytes ? sortOrder : 'asc'}
                  onClick={() => onSort(SortField.FileSizeBytes)}
                  sx={{
                    color: 'white !important',
                    '&.Mui-active': { color: 'white !important' },
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                  }}
                >
                  File size
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: 'white', fontWeight: 600 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((item) => {
              const isSelected = selected.includes(item.id);

              return (
                <TableRow
                  key={`${item.type}-${item.id}`}
                  hover
                  selected={isSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        onSelectOne(item.id, e.target.checked);
                      }}
                    />
                  </TableCell>

                  <TableCell onClick={() => onItemClick(item)}>
                    <div className="flex items-center gap-2">
                      {item.type === 'folder' ? (
                        <FolderIcon sx={{ color: '#f59e0b' }} />
                      ) : (
                        <DescriptionIcon sx={{ color: '#3b82f6' }} />
                      )}
                      <span className="text-sm text-gray-800 hover:underline">
                        {item.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-gray-600">{item.created_by}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-gray-600">{formatDate(item.created_at)}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {item.type === 'folder' ? '-' : formatFileSize(item.file_size_bytes || 0)}
                    </span>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, item)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}

            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" className="py-12">
                  <p className="text-gray-500">No items found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuAction('rename')}>Rename</MenuItem>
        <MenuItem onClick={() => handleMenuAction('move')}>Move</MenuItem>
        <MenuItem onClick={() => handleMenuAction('delete')} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

