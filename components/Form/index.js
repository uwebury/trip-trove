import React, { useState } from "react";
import mongoose from "mongoose";
import toast from "react-hot-toast";
import {
  toastDuration,
  validateTripDates,
  formatDateForInput,
} from "@/lib/utils";
import { ToastMessage } from "@/components/ToastMessage";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import {
  Label,
  TripForm,
  Input,
  DateContainer,
  PackListContainer,
  PackList,
  InputContainer,
  InputItem,
  InputQuantity,
  StyledMiniButton,
  Select,
  TemplateContainer,
} from "@/components/Form/Form.styled";
import { packingListTemplates } from "@/lib/packingListTemplates";

const INITIAL_DATA = {
  destination: "",
  start: "",
  end: "",
  imageURL: "",
  notes: "",
  packingList: [],
};

export default function Form({
  defaultData = INITIAL_DATA,
  isEditMode,
  onSubmit,
}) {
  const [formDisabled, setFormDisabled] = useState(false);
  const [handoverData, setHandoverData] = useState(defaultData);
  const [hasChanges, setHasChanges] = useState(false);
  const [newPackingListItem, setNewPackingListItem] = useState({
    itemName: "",
    itemQuantity: null,
  });
  const [selectedTemplate, setSelectedTemplate] = useState("S");
  // added line 53
  const [lastAppliedTemplate, setLastAppliedTemplate] = useState(null);
  const { ObjectId } = mongoose.Types;

  function generateObjectId() {
    const newObjectId = new ObjectId().toString();
    return newObjectId;
  }

  function handleUpdateNewPackingListItemName(newName) {
    const updatedNewPackingListItem = {
      itemName: newName,
      itemQuantity: newPackingListItem.itemQuantity,
    };
    setNewPackingListItem(updatedNewPackingListItem);
  }

  function handleUpdateNewPackingListItemQuantity(newQuantity) {
    const updatedNewPackingListItem = {
      itemQuantity: newQuantity,
      itemName: newPackingListItem.itemName,
    };
    setNewPackingListItem(updatedNewPackingListItem);
  }

  function handleAddPackingListItem() {
    const lastItem =
      handoverData.packingList[handoverData.packingList.length - 1];

    if (lastItem && lastItem.itemName === "") {
      return;
    }

    const nextPackingListItem = {
      ...newPackingListItem,
      _id: generateObjectId(),
    };

    const updatedPackingList = [
      ...handoverData.packingList,
      nextPackingListItem,
    ];

    setHandoverData((prevData) => ({
      ...prevData,
      packingList: updatedPackingList,
    }));

    setNewPackingListItem({ itemName: "", itemQuantity: null });
    setHasChanges(true);
  }

  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setHasChanges(true);
  }

  function handleUpdateItem(itemId, itemName, itemQuantity) {
    setHandoverData((prev) => {
      const updatedPackingList = prev.packingList.map((item) =>
        item._id === itemId ? { ...item, itemName, itemQuantity } : item
      );

      return {
        ...prev,
        packingList: updatedPackingList,
      };
    });

    setHasChanges(true);
  }

  function handleRemoveItem(itemIdToRemove) {
    setHandoverData((prevData) => {
      const updatedPackingList = handoverData.packingList.filter((item) => {
        return item._id !== itemIdToRemove;
      });

      return {
        ...prevData,
        packingList: updatedPackingList,
      };
    });
    setHasChanges(true);
  }

  function handleReset() {
    toast.dismiss();
    setFormDisabled(true);
    if (!hasChanges) {
      toast.error("No entries yet, nothing to reset.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    toast(
      <ToastMessage
        message="Are you sure to reset form?"
        textConfirmButton="Yes, reset please."
        messageAfterConfirm="Ok, form reset."
        textCancelButton="No, don&rsquo;t reset!"
        messageAfterCancel="Ok, no reset."
        onConfirm={() => {
          setHandoverData(defaultData);
          setNewPackingListItem({
            itemName: "",
            itemQuantity: null,
          });
          setFormDisabled(false);
          setHasChanges(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    toast.dismiss();
    setFormDisabled(true);

    if (!hasChanges) {
      toast.error("No changes yet, nothing to save.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    if (!validateTripDates(handoverData)) {
      toast.error("End date earlier than start date.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    toast(
      <ToastMessage
        message="Are you sure to save all changes?"
        textConfirmButton="Yes, save please."
        messageAfterConfirm="Data successfully saved."
        textCancelButton="No, don&rsquo;t save."
        messageAfterCancel="Data not saved."
        onConfirm={() => {
          onSubmit(handoverData);
          setFormDisabled(false);
          setHasChanges(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  const generatePackingListFromTemplate = () => {
    // Check if the last applied template is the same as the currently selected one
    if (lastAppliedTemplate === selectedTemplate) {
      // If they are the same, do nothing
      return;
    }

    // Update the last applied template with the currently selected one
    setLastAppliedTemplate(selectedTemplate);

    const template = packingListTemplates[selectedTemplate];
    const updatedPackingList = [...handoverData.packingList];

    const lastItem = updatedPackingList[updatedPackingList.length - 1];
    if (lastItem && lastItem.itemName === "") {
      updatedPackingList.pop();
      updatedPackingList.push(
        ...template.map((item) => ({
          ...item,
          _id: generateObjectId(),
        }))
      );
    } else {
      updatedPackingList.push(
        ...template.map((item) => ({
          ...item,
          _id: generateObjectId(),
        }))
      );
    }

    setHandoverData((prevData) => ({
      ...prevData,
      packingList: updatedPackingList,
    }));
    setHasChanges(true);
  };

  // const generatePackingListFromTemplate = () => {
  //   const template = packingListTemplates[selectedTemplate];
  //   const updatedPackingList = [...handoverData.packingList];

  //   const lastItem = updatedPackingList[updatedPackingList.length - 1];
  //   if (lastItem && lastItem.itemName === "") {
  //     updatedPackingList.pop();
  //     updatedPackingList.push(
  //       ...template.map((item) => ({
  //         ...item,
  //         _id: generateObjectId(),
  //       }))
  //     );
  //   } else {
  //     updatedPackingList.push(
  //       ...template.map((item) => ({
  //         ...item,
  //         _id: generateObjectId(),
  //       }))
  //     );
  //   }

  //   setHandoverData((prevData) => ({
  //     ...prevData,
  //     packingList: updatedPackingList,
  //   }));
  //   setHasChanges(true);
  // };

  return (
    <TripForm
      aria-label="trip form"
      onSubmit={handleSubmit}
      formDisabled={formDisabled}
    >
      <Label htmlFor="destination">Destination</Label>
      <Input
        id="destination"
        name="destination"
        type="text"
        value={handoverData?.destination || ""}
        onInput={handleInput}
        required
        disabled={formDisabled}
        autoFocus
      />
      <DateContainer>
        <Label htmlFor="start">Start</Label>
        <Input
          id="start"
          name="start"
          type="date"
          value={formatDateForInput(handoverData?.start || "")}
          onInput={handleInput}
          required
          disabled={formDisabled}
        />
        <Label htmlFor="end">End</Label>
        <Input
          id="end"
          name="end"
          type="date"
          value={formatDateForInput(handoverData?.end || "")}
          onInput={handleInput}
          required
          disabled={formDisabled}
        />
      </DateContainer>
      <Label htmlFor="imageURL">Image URL</Label>
      <Input
        id="imageURL"
        name="imageURL"
        type="text"
        value={handoverData?.imageURL || ""}
        onInput={handleInput}
        disabled={formDisabled}
      />
      <PackListContainer>
        <Label htmlFor="packingList">Packing List</Label>
        <TemplateContainer>
          <Select
            id="template"
            name="template"
            onChange={(event) => setSelectedTemplate(event.target.value)}
            value={selectedTemplate}
            disabled={formDisabled}
          >
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
          </Select>
          <StyledTextButton
            type="button"
            onClick={generatePackingListFromTemplate}
            disabled={formDisabled}
          >
            Apply Template
          </StyledTextButton>
        </TemplateContainer>
        <PackList>
          {handoverData.packingList.map((item, index) => (
            <InputContainer key={item._id}>
              <InputItemAndQuantity
                item={item}
                handleUpdateItem={handleUpdateItem}
                handleRemoveItem={handleRemoveItem}
                formDisabled={formDisabled}
              />
            </InputContainer>
          ))}
          {handoverData.showNewPackingListItem && (
            <NewPackingListItem
              newPackingListItem={newPackingListItem}
              handleUpdateNewPackingListItemName={
                handleUpdateNewPackingListItemName
              }
              handleUpdateNewPackingListItemQuantity={
                handleUpdateNewPackingListItemQuantity
              }
              formDisabled={formDisabled}
            />
          )}
          <StyledMiniButton
            type="button"
            id="add"
            action="add"
            fontSize={"1.4rem"}
            onClick={handleAddPackingListItem}
            disabled={formDisabled}
          >
            +
          </StyledMiniButton>
        </PackList>
      </PackListContainer>
      <Label htmlFor="notes">Notes</Label>
      <Input
        id="notes"
        name="notes"
        type="text"
        value={handoverData?.notes || ""}
        onInput={handleInput}
        disabled={formDisabled}
      />
      <ButtonContainer>
        <StyledTextButton
          type="button"
          onClick={handleReset}
          disabled={formDisabled}
        >
          {isEditMode ? "Discard" : "Reset"}
        </StyledTextButton>
        <StyledTextButton type="submit" disabled={formDisabled}>
          Save
        </StyledTextButton>
      </ButtonContainer>
    </TripForm>
  );
}

function InputItemAndQuantity({
  item,
  handleUpdateItem,
  handleRemoveItem,
  formDisabled,
}) {
  return (
    <>
      <InputItem
        id={`packingList_${item._id}`}
        name={`packingList_${item._id}`}
        type="text"
        value={item.itemName}
        onChange={(event) =>
          handleUpdateItem(item._id, event.target.value, item.itemQuantity)
        }
        disabled={formDisabled}
      />
      <InputQuantity
        id={`packingList_quantity_${item._id}`}
        name={`packingList_quantity_${item._id}`}
        type="number"
        value={item.itemQuantity}
        onChange={(event) =>
          handleUpdateItem(item._id, item.itemName, event.target.value)
        }
        disabled={formDisabled}
        min="0"
        max="999"
      />
      <StyledMiniButton
        type="button"
        id="delete"
        action="delete"
        onClick={() => handleRemoveItem(item._id)}
        disabled={formDisabled}
      >
        X
      </StyledMiniButton>
    </>
  );
}

function NewPackingListItem({
  newPackingListItem,
  handleUpdateNewPackingListItemName,
  handleUpdateNewPackingListItemQuantity,
  formDisabled,
}) {
  return (
    <InputContainer>
      <InputItem
        type="text"
        disabled={formDisabled}
        value={newPackingListItem.itemName}
        onChange={(event) =>
          handleUpdateNewPackingListItemName(event.target.value)
        }
      />
      <InputQuantity
        type="number"
        disabled={formDisabled}
        value={newPackingListItem.itemQuantity}
        onChange={(event) =>
          handleUpdateNewPackingListItemQuantity(event.target.value)
        }
        min="0"
        max="999"
      />
    </InputContainer>
  );
}
