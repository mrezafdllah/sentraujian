import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const participants = [['Peserta 001', 'ACTIVE'], ['Peserta 002', 'SUBMITTED'], ['Peserta 003', 'DISCONNECTED']] as const;

export default function Monitor() { return <View style={styles.page}><Link href="/mobile/dashboard" style={styles.back}>Back to dashboard</Link><Text style={styles.title}>Live monitor</Text><Text style={styles.muted}>WebSocket demo stream · LAN connected</Text>{participants.map(([name, status]) => <View style={styles.row} key={name}><Text style={styles.name}>{name}</Text><Text style={status === 'ACTIVE' ? styles.active : styles.status}>{status}</Text></View>)}</View>; }

const styles = StyleSheet.create({ page: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#f1f6f8' }, back: { color: '#27719a', marginBottom: 24 }, title: { fontSize: 30, fontWeight: '700', color: '#143d52' }, muted: { color: '#718591', marginTop: 6, marginBottom: 22 }, row: { backgroundColor: '#fff', borderRadius: 10, padding: 18, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }, name: { color: '#173d51', fontWeight: '600' }, status: { color: '#9b5f00', fontSize: 12, fontWeight: '700' }, active: { color: '#19845d', fontSize: 12, fontWeight: '700' } });
