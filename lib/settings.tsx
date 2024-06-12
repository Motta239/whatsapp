import Colors from './Colors';

export const settings = [
  {
    title: 'Devices',
    data: [
      { id: '1', name: 'Broadcast Lists', icon: 'megaphone', backgroundColor: Colors.green },
      { id: '2', name: 'Starred Messages', icon: 'star', backgroundColor: Colors.yellow },
      { id: '3', name: 'Linked Devices', icon: 'laptop-outline', backgroundColor: Colors.green },
      { id: '4', name: 'Dark Mode', icon: 'moon', backgroundColor: Colors.green },
    ],
  },
  {
    title: 'Items',
    data: [
      { id: '1', name: 'Account', icon: 'key', backgroundColor: Colors.primary },
      { id: '2', name: 'Privacy', icon: 'lock-closed', backgroundColor: '#33A5D1' },
      { id: '3', name: 'Chats', icon: 'logo-whatsapp', backgroundColor: Colors.green },
      { id: '4', name: 'Notifications', icon: 'notifications', backgroundColor: Colors.red },
      { id: '5', name: 'Storage and Data', icon: 'repeat', backgroundColor: Colors.green },
    ],
  },
  {
    title: 'Support',
    data: [
      { id: '1', name: 'Help', icon: 'information', backgroundColor: Colors.primary },
      { id: '2', name: 'Tell a Friend', icon: 'heart', backgroundColor: Colors.red },
    ],
  },
];

export const sections = [
  {
    title: 'Media',
    data: [
      { id: '1', title: 'Media, links and docs', value: 14, icon: 'image-outline' },
      { id: '5', title: 'Save to Photos', value: 'Default', icon: 'save-outline' },
    ],
  },
  {
    title: 'Messages',
    data: [
      { id: '2', title: 'Starred messages', value: 'None', icon: 'star-outline' },
      { id: '7', title: 'Disappearing messages', value: 'Off', icon: 'time-outline' },
    ],
  },
  {
    title: 'Settings',
    data: [
      { id: '3', title: 'Notifications', icon: 'notifications-outline' },
      { id: '4', title: 'Wallpaper', icon: 'color-palette-outline' },
      { id: '6', title: 'Encryption', icon: 'lock-closed-outline' },
      { id: '8', title: 'Lock chat', icon: 'chatbox-ellipses-outline' },
    ],
  },
  {
    title: 'Contact',
    data: [
      { id: '9', title: 'Contact details', icon: 'person-outline' },
      { id: '10', title: 'Share contact', color: 'green', icon: 'share-outline' },
    ],
  },
  {
    title: 'Actions',
    data: [
      { id: '11', title: 'Export chat', color: 'green', icon: 'download-outline' },
      { id: '12', title: 'Clear chat', color: 'red', icon: 'trash-outline' },
      { id: '13', title: 'Block', color: 'red', icon: 'close-circle-outline' },
      { id: '14', title: 'Report', color: 'red', icon: 'alert-circle-outline' },
    ],
  },
];
