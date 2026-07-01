import { useEffect, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeaderLogo } from '../components/ui/AppHeaderLogo';
import { MCButton } from '../components/ui/MCButton';
import { MCCard } from '../components/ui/MCCard';
import { MCInput } from '../components/ui/MCInput';
import { MCText } from '../components/ui/MCText';
import { Colors, Typography } from '../theme';
import { useUserStore } from '../store/useUserStore';
import { isValidPhone } from '../utils/validation.utils';

export function EmergencyScreen() {
  const router = useRouter();
  const profile = useUserStore((state) => state.profile);
  const ensureProfile = useUserStore((state) => state.ensureProfile);
  const addEmergencyContact = useUserStore((state) => state.addEmergencyContact);
  const updateEmergencyContact = useUserStore((state) => state.updateEmergencyContact);
  const removeEmergencyContact = useUserStore((state) => state.removeEmergencyContact);

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Proche');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    ensureProfile();
  }, [ensureProfile]);

  const contacts = profile?.emergencyContacts ?? [];

  const onSaveContact = () => {
    if (!name.trim() || !phone.trim() || !isValidPhone(phone.trim())) {
      return;
    }

    if (editingId) {
      updateEmergencyContact(editingId, {
        name: name.trim(),
        relationship: relationship.trim(),
        phone: phone.trim(),
      });
      setEditingId(null);
      setName('');
      setPhone('');
      return;
    }

    addEmergencyContact({
      id: `${Date.now()}`,
      name: name.trim(),
      relationship: relationship.trim(),
      phone: phone.trim(),
      isInCircle: false,
    });
    setName('');
    setPhone('');
  };

  const onEditContact = (id: string) => {
    const contact = contacts.find((item) => item.id === id);
    if (!contact) {
      return;
    }
    setEditingId(id);
    setName(contact.name);
    setRelationship(contact.relationship);
    setPhone(contact.phone);
  };

  const confirmDeleteContact = (id: string) => {
    const proceed = () => removeEmergencyContact(id);

    if (Platform.OS === 'web') {
      const confirmed = typeof globalThis.confirm === 'function'
        ? globalThis.confirm('Supprimer ce contact d\'urgence ?')
        : true;
      if (confirmed) {
        proceed();
      }
      return;
    }

    Alert.alert('Confirmation', 'Supprimer ce contact d\'urgence ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: proceed },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <MCButton label="Retour" variant="ghost" fullWidth={false} onPress={() => router.back()} />
      </View>
      <AppHeaderLogo />
      <View style={styles.heroFrame}>
        <Image source={require('../../assets/images/Urgence.png')} style={styles.heroImage} resizeMode="contain" />
      </View>
      <MCText style={styles.kicker}>Urgence</MCText>
      <MCText style={styles.title}>Accès rapide en situation critique.</MCText>
      <MCText style={styles.subtitle}>Concentrez vos contacts, consignes et informations essentielles au même endroit.</MCText>

      <MCCard style={styles.alertCard}>
        <View style={styles.alertTitleRow}>
          <Image source={require('../../assets/images/sos.png')} style={styles.sosIcon} resizeMode="contain" />
          <MCText style={styles.alertTitle}>Contacts d'urgence</MCText>
        </View>
        <MCInput placeholder="Nom" value={name} onChangeText={setName} style={styles.input} />
        <MCInput placeholder="Relation" value={relationship} onChangeText={setRelationship} style={styles.input} />
        <MCInput placeholder="Téléphone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
        <MCButton
          label={editingId ? 'Enregistrer le contact' : 'Ajouter le contact'}
          variant="danger"
          onPress={onSaveContact}
        />
      </MCCard>

      {contacts.length === 0 ? (
        <MCCard style={styles.alertCard}>
          <MCText style={styles.alertBody}>Ajoutez au moins un contact et une instruction prioritaire.</MCText>
        </MCCard>
      ) : (
        contacts.map((contact) => (
          <MCCard key={contact.id} style={styles.alertCard}>
            <MCText style={styles.alertTitle}>{contact.name}</MCText>
            <MCText style={styles.alertBody}>{contact.relationship} - {contact.phone}</MCText>
            <View style={styles.actionsInline}>
              <MCButton label="Éditer" size="sm" variant="secondary" fullWidth={false} onPress={() => onEditContact(contact.id)} />
              <MCButton label="Supprimer" size="sm" variant="danger" fullWidth={false} onPress={() => confirmDeleteContact(contact.id)} />
            </View>
          </MCCard>
        ))
      )}

      <View style={styles.actions}>
        <MCButton label="Configurer l'urgence" variant="danger" onPress={() => undefined} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  headerRow: {
    marginBottom: 12,
  },
  heroFrame: {
    backgroundColor: '#FDEEEE',
    borderRadius: 20,
    padding: 10,
    marginBottom: 18,
  },
  heroImage: {
    width: '100%',
    height: 170,
  },
  kicker: {
    color: Colors.danger,
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 8,
  },
  title: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 31,
    lineHeight: 38,
  },
  subtitle: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 20,
  },
  alertCard: {
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
    backgroundColor: '#FFFFFF',
    padding: 18,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sosIcon: {
    width: 22,
    height: 22,
  },
  alertTitle: {
    color: Colors.danger,
    fontFamily: Typography.fonts.title,
    fontSize: 17,
    lineHeight: 22,
  },
  alertBody: {
    color: Colors.text,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 21,
  },
  input: {
    marginBottom: 10,
  },
  actions: {
    marginTop: 16,
  },
  actionsInline: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
});
