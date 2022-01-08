import React, { FC } from 'react'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import PerfumeCardsHome from '../components/PerfumeCardsHome'
import BrandSection from '../components/BrandSection'

import banner2 from '../assets/images/banner2.png'

const Home: FC = () => {
    return (
        <Helmet title='Home'>
            {/* hero slider */}
            <HeroSlider />
            {/* end hero slider */}

            {/* most popular section */}
            <Section>
                <SectionTitle>
                    Most popular products
                </SectionTitle>
                <SectionBody>
                    <Grid
                        colProp={3}
                        mdColProp={2}
                        smColProp={1}
                        gap={80}
                    >
                        <PerfumeCardsHome />
                    </Grid>
                </SectionBody>
            </Section>
            {/* end best selling section */}

            {/* brands section */}
            <Section>
                <SectionBody>
                    <BrandSection />
                </SectionBody>
            </Section>
            {/* end brands section */}

            {/* chanel section */}
            <Section>
                <SectionBody>
                    <img src={banner2} alt="" />
                </SectionBody>
            </Section>
            {/* end chanel section */}
        </Helmet>
    )
}

export default Home