import { useMemo, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeaderLogo } from '../components/ui/AppHeaderLogo';
import { MCButton } from '../components/ui/MCButton';
import { MCCard } from '../components/ui/MCCard';
import { MCInput } from '../components/ui/MCInput';
import { MCText } from '../components/ui/MCText';
import { Colors, Typography } from '../theme';
import { useCircleStore } from '../store/useCircleStore';
import { isValidEmail } from '../utils/validation.utils';

export function MyCircleScreen() {
  const router = useRouter();
  const members = useCircleStore((state) => state.members);
  const addMemberByEmail = useCircleStore((state) => state.addMemberByEmail);
  const removeMember = useCircleStore((state) => state.removeMember);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const pendingByEmail = useMemo(
    () => members.filter((item) => item.email),
    [members]
  );

  const onInviteByEmail = () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !isValidEmail(cleanEmail)) {
      return;
    }

    addMemberByEmail(cleanName, cleanEmail);
    setName('');
    setEmail('');
  };

  const confirmRemoveMember = (id: string) => {
    const proceed = () => removeMember(id);

    if (Platform.OS === 'web') {
      const confirmed = typeof globalThis.confirm === 'function'
        ? globalThis.confirm('Supprimer cette invitation ?')
        : true;
      if (confirmed) {
        proceed();
      }
      return;
    }

    Alert.alert('Confirmation', 'Supprimer cette invitation ?', [
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
        <Image source={require('../../assets/images/Cercle_II.png')} style={styles.heroImage} resizeMode="contain" />
      </View>
      <MCText style={styles.kicker}>Mon Cercle</MCText>
      <MCText style={styles.title}>Votre réseau de confiance.</MCText>
      <MCText style={styles.subtitle}>Invitez proches et aidants pour partager l'essentiel au bon moment.</MCText>

      <MCCard style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Image source={require('../../assets/images/Famille_Cercle.png')} style={styles.cardIcon} resizeMode="contain" />
          <MCText style={styles.cardTitle}>Invitation par email</MCText>
        </View>
        <MCInput placeholder="Nom" value={name} onChangeText={setName} style={styles.input} />
        <MCInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <MCButton label="Inviter par email" onPress={onInviteByEmail} />
      </MCCard>

      {pendingByEmail.length === 0 ? (
        <MCCard style={styles.card}>
          <MCText style={styles.cardBody}>Ajoutez un proche pour activer les partages et alertes prioritaires.</MCText>
        </MCCard>
      ) : (
        pendingByEmail.map((member) => (
          <MCCard key={member.id} style={styles.card}>
            <MCText style={styles.cardTitle}>{member.name}</MCText>
            <MCText style={styles.cardBody}>{member.email}</MCText>
            <MCText style={styles.cardBody}>Statut: {member.status}</MCText>
            <View style={styles.actionsInline}>
              <MCButton label="Retirer" size="sm" variant="danger" fullWidth={false} onPress={() => confirmRemoveMember(member.id)} />
            </View>
          </MCCard>
        ))
      )}
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
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 18,
  },
  heroImage: {
    width: '100%',
    height: 170,
  },
  kicker: {
    color: Colors.primary,
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
  card: {
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
    padding: 18,
    backgroundColor: '#FFFFFF',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardIcon: {
    width: 24,
    height: 24,
  },
  cardTitle: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 17,
    lineHeight: 22,
  },
  cardBody: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 21,
  },
  actions: {
    marginTop: 16,
  },
  input: {
    marginBottom: 10,
  },
  actionsInline: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
});
