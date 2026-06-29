export const Typography = {
  fonts: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  sizes: {
    display: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
    h1: { fontSize: 26, lineHeight: 34, fontWeight: '600' as const },
    h2: { fontSize: 20, lineHeight: 28, fontWeight: '600' as const },
    body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
    small: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
    caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  },
} as const;
