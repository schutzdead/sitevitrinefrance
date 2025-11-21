import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
} from '@react-email/components';

export interface ContactEmailProps {
  name: string;
  email: string;
  company: string;
  phone: string;
  project: string;
  inspiration?: string;
  colors?: string;
  additional?: string;
}

export function EmailTemplate({
  name,
  email,
  company,
  phone,
  project,
  inspiration,
  colors,
  additional,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'Arial, sans-serif' }}>
        <Container
          style={{
            margin: '40px auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            maxWidth: '600px',
          }}
        >
          {/* Header */}
          <Section style={{ marginBottom: '32px' }}>
            <Heading
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#468faf',
                margin: '0 0 8px 0',
              }}
            >
              📬 Nouveau message de contact
            </Heading>
            <Text style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Section>

          <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

          {/* Contact Information */}
          <Section style={{ marginBottom: '24px' }}>
            <Heading
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Informations de contact
            </Heading>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tr>
                <td
                  style={{
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#6b7280',
                    width: '140px',
                    fontWeight: '600',
                  }}
                >
                  Nom
                </td>
                <td style={{ padding: '8px 0', fontSize: '14px', color: '#111827' }}>
                  {name}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '600',
                  }}
                >
                  Email
                </td>
                <td style={{ padding: '8px 0', fontSize: '14px', color: '#468faf' }}>
                  <a
                    href={`mailto:${email}`}
                    style={{ color: '#468faf', textDecoration: 'none' }}
                  >
                    {email}
                  </a>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '600',
                  }}
                >
                  Entreprise
                </td>
                <td style={{ padding: '8px 0', fontSize: '14px', color: '#111827' }}>
                  {company}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '600',
                  }}
                >
                  Téléphone
                </td>
                <td style={{ padding: '8px 0', fontSize: '14px', color: '#111827' }}>
                  {phone || 'Non renseigné'}
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />

          {/* Project Description */}
          <Section style={{ marginBottom: '24px' }}>
            <Heading
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Description du projet
            </Heading>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderLeft: '4px solid #468faf',
                borderRadius: '4px',
              }}
            >
              <Text
                style={{
                  fontSize: '15px',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {project}
              </Text>
            </div>
          </Section>

          {/* Optional fields */}
          {inspiration && (
            <Section style={{ marginBottom: '16px' }}>
              <Text style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', margin: '0 0 4px 0' }}>
                Sites d'inspiration :
              </Text>
              <Text style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                {inspiration}
              </Text>
            </Section>
          )}

          {colors && (
            <Section style={{ marginBottom: '16px' }}>
              <Text style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', margin: '0 0 4px 0' }}>
                Couleurs souhaitées :
              </Text>
              <Text style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                {colors}
              </Text>
            </Section>
          )}

          {additional && (
            <>
              <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />
              <Section style={{ marginBottom: '24px' }}>
                <Heading
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 12px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Informations complémentaires
                </Heading>
                <Text
                  style={{
                    fontSize: '15px',
                    color: '#374151',
                    lineHeight: '1.6',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {additional}
                </Text>
              </Section>
            </>
          )}

          {/* Footer */}
          <Hr style={{ borderColor: '#e5e7eb', margin: '24px 0' }} />
          <Text
            style={{
              fontSize: '12px',
              color: '#9ca3af',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Email automatique envoyé depuis WebPro
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
