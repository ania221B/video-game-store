import React from 'react'

function ProductRequirementsPanels ({ platforms, currentPlatformIndex }) {
  const current = platforms[currentPlatformIndex]
  if (!current) return null

  const { platform, requirements } = current

  function isValidLabel (text) {
    if (!text) return false

    const cleaned = text.trim()

    if (cleaned.length > 40) return false
    if (cleaned.split(' ').length > 5) return false
    if (/[.,;]/.test(cleaned)) return false

    return true
  }

  function parseRequirements (text) {
    if (!text || typeof text !== 'string') return []

    return text
      .replace(/^Minimum:\s*/i, '')
      .replace(/^Recommended:\s*/i, '')
      .replace(
        /(?<!\n)(OS|Processor|Memory|Graphics|Video Card|Sound|Sound Card|DirectX|Storage|Hard Drive|Hard Disk Space|Additional Notes|Other requirements|Partner Requirements):/g,

        '\n$1:'
      )

      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [label, ...rest] = line.split(':')
        const value = rest.join(':').trim()

        if (!value || !isValidLabel(label)) {
          return {
            type: 'text',
            content: line
          }
        }

        return {
          type: 'specs',
          label: label.trim(),
          value
        }
      })
  }

  const parsedMinimum = parseRequirements(requirements?.minimum)
  const parsedRecommended = parseRequirements(requirements?.recommended)

  function splitData (parsed) {
    return {
      specs: parsed.filter(item => item.type === 'specs'),
      info: parsed.filter(item => item.type === 'text')
    }
  }
  const minimum = splitData(parsedMinimum)
  const reccommended = splitData(parsedRecommended)

  return (
    <div
      className='product__requirements__panel panel'
      role='tabpanel'
      id={platform.slug}
    >
      <section className='flow'>
        <h3 className='fs-500 fw-light uppercase letter-spacing-1'>minimum</h3>
        {requirements?.minimum ? (
          <>
            {minimum.info.length > 0 && (
              <div>
                {minimum.info.map((item, index) => (
                  <p key={`info-${index}`}>{item.content}</p>
                ))}
              </div>
            )}

            {minimum.specs.length > 0 && (
              <dl className='product__requirements-list'>
                {minimum.specs.map((item, index) => {
                  return (
                    <React.Fragment key={`minimum-${index}`}>
                      <dt>{item.label}:</dt>
                      <dd>{item.value}</dd>
                    </React.Fragment>
                  )
                })}
              </dl>
            )}
          </>
        ) : (
          <p>Not available</p>
        )}
      </section>

      <section className='flow'>
        <h3 className='fs-500 fw-light uppercase letter-spacing-1'>
          recommended
        </h3>

        {requirements?.recommended ? (
          <>
            {reccommended.info.length > 0 &&
              reccommended.info.map((item, index) => (
                <p key={`info-${index}`}>{item.content}</p>
              ))}
            {reccommended.specs.length > 0 && (
              <dl className='product__requirements-list'>
                {reccommended.specs.map((item, index) => {
                  return (
                    <React.Fragment key={`recommended-${index}`}>
                      <dt>{item.label}:</dt>
                      <dd>{item.value}</dd>
                    </React.Fragment>
                  )
                })}
              </dl>
            )}
          </>
        ) : (
          <p>Not available</p>
        )}
      </section>
    </div>
  )
}

export default ProductRequirementsPanels
