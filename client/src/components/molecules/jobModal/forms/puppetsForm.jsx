import React, { useEffect, useState } from "react"
import { getPuppets } from "../../../../services/puppetsApi"
import PuppetFields from "../fields/puppetFields"
import Tabs from "../../tabs"

const PuppetsForm = () => {
    const [{ puppets, defaultPuppet }, setPuppets] = useState({ puppets: [], defaultPuppet: {} })

    const getAllpuppets = () => {
        getPuppets().then((puppets) => {
            const defaultPuppet = puppets.find(puppet => puppet.default)
            setPuppets({ puppets, defaultPuppet })
        })
    }

    useEffect(() => { getAllpuppets() }, [])

    return (<If condition={defaultPuppet && defaultPuppet.name}>
        <Tabs initialTab={defaultPuppet.name}>
            <For each="puppetElement" of={puppets}>
                <PuppetFields
                    key={puppetElement.puppet}
                    label={puppetElement.name}
                    puppet={puppetElement}
                />
            </For>
        </Tabs>
    </If>)
}

export default PuppetsForm
