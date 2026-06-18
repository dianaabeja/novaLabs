import { isSafePublicUrl } from './safe-public-url.pipe';

describe('isSafePublicUrl', () => {
  it('accepts local and http public resources', () => {
    expect(isSafePublicUrl('/uploads/certificate.pdf')).toBeTrue();
    expect(isSafePublicUrl('https://cdn.example.com/hero.webp')).toBeTrue();
  });

  it('rejects executable or inline resource protocols', () => {
    expect(isSafePublicUrl('javascript:alert(1)')).toBeFalse();
    expect(isSafePublicUrl('data:text/html,test')).toBeFalse();
  });
});
