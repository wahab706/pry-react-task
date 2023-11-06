import React from 'react'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CustomField } from "../components";

export function PryTask() {
  return (
    <div>
       <Container maxWidth="md">
        <div className="flex flex-col mt-12 rounded border border-solid bg-white">
          <div className="flex pl-4 h-8 items-center rounded-t pr-2 bg-gray-900 bg-opacity-10 text-gray-900">
            <div className="flex-grow overflow-hidden truncate whitespace-nowrap py-3 pr-3 text-12 font-medium">
              <div className="flex flex-col">
                <div className="cursor-pointer font-semibold text-sm">
                  New Formula
                </div>
              </div>
            </div>
          </div>

          <CustomField />
        </div>
      </Container>
    </div>
  )
}
